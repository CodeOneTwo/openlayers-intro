/* */ 
(function(process) {
  var Emitter = require('events').EventEmitter;
  var parser = require('socket.io-parser');
  var url = require('url');
  var debug = require('debug')('socket.io:socket');
  var hasBin = require('has-binary');
  var assign = require('object-assign');
  module.exports = exports = Socket;
  exports.events = ['error', 'connect', 'disconnect', 'disconnecting', 'newListener', 'removeListener'];
  var flags = ['json', 'volatile', 'broadcast'];
  var emit = Emitter.prototype.emit;
  function Socket(nsp, client, query) {
    this.nsp = nsp;
    this.server = nsp.server;
    this.adapter = this.nsp.adapter;
    this.id = nsp.name !== '/' ? nsp.name + '#' + client.id : client.id;
    this.client = client;
    this.conn = client.conn;
    this.rooms = {};
    this.acks = {};
    this.connected = true;
    this.disconnected = false;
    this.handshake = this.buildHandshake(query);
    this.fns = [];
  }
  Socket.prototype.__proto__ = Emitter.prototype;
  flags.forEach(function(flag) {
    Object.defineProperty(Socket.prototype, flag, {get: function() {
        this.flags = this.flags || {};
        this.flags[flag] = true;
        return this;
      }});
  });
  Object.defineProperty(Socket.prototype, 'request', {get: function() {
      return this.conn.request;
    }});
  Socket.prototype.buildHandshake = function(query) {
    var self = this;
    function buildQuery() {
      var requestQuery = url.parse(self.request.url, true).query;
      return assign({}, query, requestQuery);
    }
    return {
      headers: this.request.headers,
      time: (new Date) + '',
      address: this.conn.remoteAddress,
      xdomain: !!this.request.headers.origin,
      secure: !!this.request.connection.encrypted,
      issued: +(new Date),
      url: this.request.url,
      query: buildQuery()
    };
  };
  Socket.prototype.emit = function(ev) {
    if (~exports.events.indexOf(ev)) {
      emit.apply(this, arguments);
    } else {
      var args = Array.prototype.slice.call(arguments);
      var packet = {};
      packet.type = hasBin(args) ? parser.BINARY_EVENT : parser.EVENT;
      packet.data = args;
      var flags = this.flags || {};
      if ('function' == typeof args[args.length - 1]) {
        if (this._rooms || flags.broadcast) {
          throw new Error('Callbacks are not supported when broadcasting');
        }
        debug('emitting packet with ack id %d', this.nsp.ids);
        this.acks[this.nsp.ids] = args.pop();
        packet.id = this.nsp.ids++;
      }
      if (this._rooms || flags.broadcast) {
        this.adapter.broadcast(packet, {
          except: [this.id],
          rooms: this._rooms,
          flags: flags
        });
      } else {
        this.packet(packet, {
          volatile: flags.volatile,
          compress: flags.compress
        });
      }
      delete this._rooms;
      delete this.flags;
    }
    return this;
  };
  Socket.prototype.to = Socket.prototype.in = function(name) {
    this._rooms = this._rooms || [];
    if (!~this._rooms.indexOf(name))
      this._rooms.push(name);
    return this;
  };
  Socket.prototype.send = Socket.prototype.write = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('message');
    this.emit.apply(this, args);
    return this;
  };
  Socket.prototype.packet = function(packet, opts) {
    packet.nsp = this.nsp.name;
    opts = opts || {};
    opts.compress = false !== opts.compress;
    this.client.packet(packet, opts);
  };
  Socket.prototype.join = function(room, fn) {
    debug('joining room %s', room);
    var self = this;
    if (this.rooms.hasOwnProperty(room)) {
      fn && fn(null);
      return this;
    }
    this.adapter.add(this.id, room, function(err) {
      if (err)
        return fn && fn(err);
      debug('joined room %s', room);
      self.rooms[room] = room;
      fn && fn(null);
    });
    return this;
  };
  Socket.prototype.leave = function(room, fn) {
    debug('leave room %s', room);
    var self = this;
    this.adapter.del(this.id, room, function(err) {
      if (err)
        return fn && fn(err);
      debug('left room %s', room);
      delete self.rooms[room];
      fn && fn(null);
    });
    return this;
  };
  Socket.prototype.leaveAll = function() {
    this.adapter.delAll(this.id);
    this.rooms = {};
  };
  Socket.prototype.onconnect = function() {
    debug('socket connected - writing packet');
    this.nsp.connected[this.id] = this;
    this.join(this.id);
    this.packet({type: parser.CONNECT});
  };
  Socket.prototype.onpacket = function(packet) {
    debug('got packet %j', packet);
    switch (packet.type) {
      case parser.EVENT:
        this.onevent(packet);
        break;
      case parser.BINARY_EVENT:
        this.onevent(packet);
        break;
      case parser.ACK:
        this.onack(packet);
        break;
      case parser.BINARY_ACK:
        this.onack(packet);
        break;
      case parser.DISCONNECT:
        this.ondisconnect();
        break;
      case parser.ERROR:
        this.emit('error', packet.data);
    }
  };
  Socket.prototype.onevent = function(packet) {
    var args = packet.data || [];
    debug('emitting event %j', args);
    if (null != packet.id) {
      debug('attaching ack callback to event');
      args.push(this.ack(packet.id));
    }
    this.dispatch(args);
  };
  Socket.prototype.ack = function(id) {
    var self = this;
    var sent = false;
    return function() {
      if (sent)
        return;
      var args = Array.prototype.slice.call(arguments);
      debug('sending ack %j', args);
      var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
      self.packet({
        id: id,
        type: type,
        data: args
      });
      sent = true;
    };
  };
  Socket.prototype.onack = function(packet) {
    var ack = this.acks[packet.id];
    if ('function' == typeof ack) {
      debug('calling ack %s with %j', packet.id, packet.data);
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
      debug('bad ack %s', packet.id);
    }
  };
  Socket.prototype.ondisconnect = function() {
    debug('got disconnect packet');
    this.onclose('client namespace disconnect');
  };
  Socket.prototype.onerror = function(err) {
    if (this.listeners('error').length) {
      this.emit('error', err);
    } else {
      console.error('Missing error handler on `socket`.');
      console.error(err.stack);
    }
  };
  Socket.prototype.onclose = function(reason) {
    if (!this.connected)
      return this;
    debug('closing socket - reason %s', reason);
    this.emit('disconnecting', reason);
    this.leaveAll();
    this.nsp.remove(this);
    this.client.remove(this);
    this.connected = false;
    this.disconnected = true;
    delete this.nsp.connected[this.id];
    this.emit('disconnect', reason);
  };
  Socket.prototype.error = function(err) {
    this.packet({
      type: parser.ERROR,
      data: err
    });
  };
  Socket.prototype.disconnect = function(close) {
    if (!this.connected)
      return this;
    if (close) {
      this.client.disconnect();
    } else {
      this.packet({type: parser.DISCONNECT});
      this.onclose('server namespace disconnect');
    }
    return this;
  };
  Socket.prototype.compress = function(compress) {
    this.flags = this.flags || {};
    this.flags.compress = compress;
    return this;
  };
  Socket.prototype.dispatch = function(event) {
    debug('dispatching an event %j', event);
    var self = this;
    this.run(event, function(err) {
      process.nextTick(function() {
        if (err) {
          return self.error(err.data || err.message);
        }
        emit.apply(self, event);
      });
    });
  };
  Socket.prototype.use = function(fn) {
    this.fns.push(fn);
    return this;
  };
  Socket.prototype.run = function(event, fn) {
    var fns = this.fns.slice(0);
    if (!fns.length)
      return fn(null);
    function run(i) {
      fns[i](event, function(err) {
        if (err)
          return fn(err);
        if (!fns[i + 1])
          return fn(null);
        run(i + 1);
      });
    }
    run(0);
  };
})(require('process'));
