/* */ 
(function(process) {
  var jQuerySelector;
  var jQueryCallback;
  var jQueryAjaxSettings;
  function jQuery(arg1, arg2) {}
  var $ = jQuery;
  jQuery.prototype.add = function(arg1, context) {};
  jQuery.prototype.addBack = function(arg1) {};
  jQuery.prototype.addClass = function(arg1) {};
  jQuery.prototype.after = function(arg1, content) {};
  jQuery.ajax = function(arg1, settings) {};
  jQuery.prototype.ajaxComplete = function(handler) {};
  jQuery.prototype.ajaxError = function(handler) {};
  jQuery.ajaxPrefilter = function(dataTypes, handler) {};
  jQuery.prototype.ajaxSend = function(handler) {};
  jQuery.ajaxSettings;
  jQuery.ajaxSettings.flatOptions = {};
  jQuery.ajaxSettings.processData;
  jQuery.ajaxSettings.responseFields = {};
  jQuery.ajaxSetup = function(options) {};
  jQuery.prototype.ajaxStart = function(handler) {};
  jQuery.prototype.ajaxStop = function(handler) {};
  jQuery.prototype.ajaxSuccess = function(handler) {};
  jQuery.prototype.andSelf = function() {};
  jQuery.prototype.animate = function(properties, arg2, easing, complete) {};
  jQuery.prototype.append = function(arg1, content) {};
  jQuery.prototype.appendTo = function(target) {};
  jQuery.prototype.attr = function(arg1, arg2) {};
  jQuery.prototype.before = function(arg1, content) {};
  jQuery.prototype.bind = function(arg1, eventData, arg3) {};
  jQuery.prototype.blur = function(arg1, handler) {};
  jQuery.callbacks = function() {};
  jQuery.Callbacks = function(flags) {};
  jQuery.callbacks.prototype.add = function(callbacks) {};
  jQuery.callbacks.prototype.disable = function() {};
  jQuery.callbacks.prototype.empty = function() {};
  jQuery.callbacks.prototype.fire = function(var_args) {};
  jQuery.callbacks.prototype.fired = function() {};
  jQuery.callbacks.prototype.fireWith = function(var_args) {};
  jQuery.callbacks.prototype.has = function(callback) {};
  jQuery.callbacks.prototype.lock = function() {};
  jQuery.callbacks.prototype.locked = function() {};
  jQuery.callbacks.prototype.remove = function(callbacks) {};
  jQuery.prototype.change = function(arg1, handler) {};
  jQuery.prototype.children = function(selector) {};
  jQuery.prototype.clearQueue = function(queueName) {};
  jQuery.prototype.click = function(arg1, handler) {};
  jQuery.prototype.clone = function(withDataAndEvents, deepWithDataAndEvents) {};
  jQuery.prototype.closest = function(arg1, context) {};
  jQuery.contains = function(container, contained) {};
  jQuery.prototype.contents = function() {};
  jQuery.prototype.context;
  jQuery.prototype.css = function(arg1, arg2) {};
  jQuery.cssHooks;
  jQuery.data = function(elem, key, value) {};
  jQuery.prototype.data = function(arg1, value) {};
  jQuery.prototype.dblclick = function(arg1, handler) {};
  jQuery.deferred = function(opt_fn) {};
  jQuery.Deferred = function(opt_fn) {};
  jQuery.deferred.prototype.always = function(alwaysCallbacks, alwaysCallbacks2) {};
  jQuery.deferred.prototype.done = function(doneCallbacks, doneCallbacks2) {};
  jQuery.deferred.prototype.fail = function(failCallbacks, failCallbacks2) {};
  jQuery.deferred.prototype.notify = function(var_args) {};
  jQuery.deferred.prototype.notifyWith = function(context, var_args) {};
  jQuery.deferred.prototype.pipe = function(doneFilter, failFilter, progressFilter) {};
  jQuery.deferred.prototype.progress = function(progressCallbacks) {};
  jQuery.deferred.prototype.promise = function(target) {};
  jQuery.deferred.prototype.reject = function(var_args) {};
  jQuery.deferred.prototype.rejectWith = function(context, args) {};
  jQuery.deferred.prototype.resolve = function(var_args) {};
  jQuery.deferred.prototype.resolveWith = function(context, args) {};
  jQuery.deferred.prototype.state = function() {};
  jQuery.deferred.prototype.then = function(doneCallbacks, failCallbacks, progressCallbacks) {};
  jQuery.prototype.delay = function(duration, queueName) {};
  jQuery.prototype.delegate = function(selector, arg2, arg3, handler) {};
  jQuery.dequeue = function(elem, queueName) {};
  jQuery.prototype.dequeue = function(queueName) {};
  jQuery.prototype.detach = function(selector) {};
  jQuery.each = function(collection, callback) {};
  jQuery.prototype.each = function(fnc) {};
  jQuery.prototype.empty = function() {};
  jQuery.prototype.end = function() {};
  jQuery.prototype.eq = function(arg1) {};
  jQuery.error = function(message) {};
  jQuery.prototype.error = function(arg1, handler) {};
  jQuery.event = {};
  jQuery.event.props;
  jQuery.event.special;
  jQuery.Event = function(eventType, properties) {};
  jQuery.Event.prototype.altKey;
  jQuery.Event.prototype.bubbles;
  jQuery.Event.prototype.button;
  jQuery.Event.prototype.cancelable;
  jQuery.Event.prototype.charChode;
  jQuery.Event.prototype.clientX;
  jQuery.Event.prototype.clientY;
  jQuery.Event.prototype.ctrlKey;
  jQuery.Event.prototype.currentTarget;
  jQuery.Event.prototype.data;
  jQuery.Event.prototype.delegateTarget;
  jQuery.Event.prototype.detail;
  jQuery.Event.prototype.eventPhase;
  jQuery.Event.prototype.isDefaultPrevented = function() {};
  jQuery.Event.prototype.isImmediatePropagationStopped = function() {};
  jQuery.Event.prototype.isPropagationStopped = function() {};
  jQuery.Event.prototype.metaKey;
  jQuery.Event.prototype.namespace;
  jQuery.Event.prototype.offsetX;
  jQuery.Event.prototype.offsetY;
  jQuery.Event.prototype.originalEvent;
  jQuery.Event.prototype.originalTarget;
  jQuery.Event.prototype.pageX;
  jQuery.Event.prototype.pageY;
  jQuery.Event.prototype.preventDefault = function() {};
  jQuery.Event.prototype.props;
  jQuery.Event.prototype.relatedTarget;
  jQuery.Event.prototype.result;
  jQuery.Event.prototype.screenX;
  jQuery.Event.prototype.screenY;
  jQuery.Event.prototype.shiftKey;
  jQuery.Event.prototype.stopImmediatePropagation = function() {};
  jQuery.Event.prototype.stopPropagation = function() {};
  jQuery.Event.prototype.target;
  jQuery.Event.prototype.timeStamp;
  jQuery.Event.prototype.type;
  jQuery.Event.prototype.view;
  jQuery.Event.prototype.which;
  jQuery.extend = function(arg1, var_args) {};
  jQuery.prototype.extend = function(arg1, var_args) {};
  jQuery.prototype.fadeIn = function(duration, arg2, callback) {};
  jQuery.prototype.fadeOut = function(duration, arg2, callback) {};
  jQuery.prototype.fadeTo = function(duration, opacity, arg3, callback) {};
  jQuery.prototype.fadeToggle = function(duration, easing, callback) {};
  jQuery.prototype.filter = function(arg1) {};
  jQuery.prototype.find = function(arg1) {};
  jQuery.prototype.first = function() {};
  jQuery.fn = jQuery.prototype;
  jQuery.prototype.focus = function(arg1, handler) {};
  jQuery.prototype.focusin = function(arg1, handler) {};
  jQuery.prototype.focusout = function(arg1, handler) {};
  jQuery.fx = {};
  jQuery.fx.interval;
  jQuery.fx.off;
  jQuery.get = function(url, data, success, dataType) {};
  jQuery.prototype.get = function(index) {};
  jQuery.getJSON = function(url, data, success) {};
  jQuery.getScript = function(url, success) {};
  jQuery.globalEval = function(code) {};
  jQuery.grep = function(arr, fnc, invert) {};
  jQuery.prototype.has = function(arg1) {};
  jQuery.prototype.hasClass = function(className) {};
  jQuery.hasData = function(elem) {};
  jQuery.prototype.height = function(arg1) {};
  jQuery.prototype.hide = function(duration, arg2, callback) {};
  jQuery.holdReady = function(hold) {};
  jQuery.prototype.hover = function(arg1, handlerOut) {};
  jQuery.prototype.html = function(arg1) {};
  jQuery.inArray = function(value, arr, fromIndex) {};
  jQuery.prototype.index = function(arg1) {};
  jQuery.prototype.innerHeight = function() {};
  jQuery.prototype.innerWidth = function() {};
  jQuery.prototype.insertAfter = function(target) {};
  jQuery.prototype.insertBefore = function(target) {};
  jQuery.prototype.is = function(arg1) {};
  jQuery.isArray = function(obj) {};
  jQuery.isEmptyObject = function(obj) {};
  jQuery.isFunction = function(obj) {};
  jQuery.isNumeric = function(value) {};
  jQuery.isPlainObject = function(obj) {};
  jQuery.isWindow = function(obj) {};
  jQuery.isXMLDoc = function(node) {};
  jQuery.prototype.jquery;
  jQuery.jqXHR = function() {};
  jQuery.jqXHR.prototype.always = function(alwaysCallbacks, alwaysCallbacks2) {};
  jQuery.jqXHR.prototype.complete = function(callback) {};
  jQuery.jqXHR.prototype.done = function(doneCallbacks) {};
  jQuery.jqXHR.prototype.error = function(callback) {};
  jQuery.jqXHR.prototype.fail = function(failCallbacks) {};
  jQuery.jqXHR.prototype.onreadystatechange = function(callback) {};
  jQuery.jqXHR.prototype.pipe = function(doneFilter, failFilter, progressFilter) {};
  jQuery.jqXHR.prototype.success = function(callback) {};
  jQuery.jqXHR.prototype.then = function(doneCallbacks, failCallbacks, progressCallbacks) {};
  jQuery.prototype.keydown = function(arg1, handler) {};
  jQuery.prototype.keypress = function(arg1, handler) {};
  jQuery.prototype.keyup = function(arg1, handler) {};
  jQuery.prototype.last = function() {};
  jQuery.prototype.length;
  jQuery.prototype.load = function(arg1, arg2, complete) {};
  jQuery.makeArray = function(obj) {};
  jQuery.map = function(arg1, callback) {};
  jQuery.prototype.map = function(callback) {};
  jQuery.merge = function(first, second) {};
  jQuery.prototype.mousedown = function(arg1, handler) {};
  jQuery.prototype.mouseenter = function(arg1, handler) {};
  jQuery.prototype.mouseleave = function(arg1, handler) {};
  jQuery.prototype.mousemove = function(arg1, handler) {};
  jQuery.prototype.mouseout = function(arg1, handler) {};
  jQuery.prototype.mouseover = function(arg1, handler) {};
  jQuery.prototype.mouseup = function(arg1, handler) {};
  jQuery.prototype.next = function(selector) {};
  jQuery.prototype.nextAll = function(selector) {};
  jQuery.prototype.nextUntil = function(arg1, filter) {};
  jQuery.noConflict = function(removeAll) {};
  jQuery.noop = function() {};
  jQuery.prototype.not = function(arg1) {};
  jQuery.now = function() {};
  jQuery.prototype.off = function(arg1, selector, handler) {};
  jQuery.prototype.offset = function(arg1) {};
  jQuery.prototype.offsetParent = function() {};
  jQuery.prototype.on = function(arg1, selector, data, handler) {};
  jQuery.prototype.one = function(arg1, arg2, arg3, handler) {};
  jQuery.prototype.outerHeight = function(includeMargin) {};
  jQuery.prototype.outerWidth = function(includeMargin) {};
  jQuery.param = function(obj, traditional) {};
  jQuery.prototype.parent = function(selector) {};
  jQuery.prototype.parents = function(selector) {};
  jQuery.prototype.parentsUntil = function(arg1, filter) {};
  jQuery.parseHTML = function(data, context, keepScripts) {};
  jQuery.parseJSON = function(json) {};
  jQuery.parseXML = function(data) {};
  jQuery.prototype.position = function() {};
  jQuery.post = function(url, data, success, dataType) {};
  jQuery.prototype.prepend = function(arg1, content) {};
  jQuery.prototype.prependTo = function(target) {};
  jQuery.prototype.prev = function(selector) {};
  jQuery.prototype.prevAll = function(selector) {};
  jQuery.prototype.prevUntil = function(arg1, filter) {};
  jQuery.prototype.promise = function(type, target) {};
  jQuery.Promise = function() {};
  jQuery.Promise.prototype.always = function(alwaysCallbacks, alwaysCallbacks2) {};
  jQuery.Promise.prototype.done = function(doneCallbacks) {};
  jQuery.Promise.prototype.fail = function(failCallbacks) {};
  jQuery.Promise.prototype.pipe = function(doneFilter, failFilter, progressFilter) {};
  jQuery.Promise.prototype.then = function(doneCallbacks, failCallbacks, progressCallbacks) {};
  jQuery.prototype.prop = function(arg1, arg2) {};
  jQuery.proxy = function(var_args) {};
  jQuery.prototype.pushStack = function(elements, name, args) {};
  jQuery.prototype.queue = function(queueName, arg2) {};
  jQuery.queue = function(elem, queueName, arg3) {};
  jQuery.prototype.ready = function(handler) {};
  jQuery.prototype.remove = function(selector) {};
  jQuery.prototype.removeAttr = function(attributeName) {};
  jQuery.prototype.removeClass = function(arg1) {};
  jQuery.prototype.removeData = function(arg1) {};
  jQuery.removeData = function(elem, name) {};
  jQuery.prototype.removeProp = function(propertyName) {};
  jQuery.prototype.replaceAll = function(target) {};
  jQuery.prototype.replaceWith = function(arg1) {};
  jQuery.prototype.resize = function(arg1, handler) {};
  jQuery.prototype.scroll = function(arg1, handler) {};
  jQuery.prototype.scrollLeft = function(value) {};
  jQuery.prototype.scrollTop = function(value) {};
  jQuery.prototype.select = function(arg1, handler) {};
  jQuery.prototype.serialize = function() {};
  jQuery.prototype.serializeArray = function() {};
  jQuery.prototype.show = function(duration, arg2, callback) {};
  jQuery.prototype.siblings = function(selector) {};
  jQuery.prototype.size = function() {};
  jQuery.prototype.slice = function(start, end) {};
  jQuery.prototype.slideDown = function(optionsOrDuration, completeOrEasing, complete) {};
  jQuery.prototype.slideToggle = function(optionsOrDuration, completeOrEasing, complete) {};
  jQuery.prototype.slideUp = function(optionsOrDuration, completeOrEasing, complete) {};
  jQuery.prototype.stop = function(arg1, arg2, jumpToEnd) {};
  jQuery.prototype.submit = function(arg1, handler) {};
  jQuery.support;
  jQuery.support.boxModel;
  jQuery.support.changeBubbles;
  jQuery.support.cors;
  jQuery.support.cssFloat;
  jQuery.support.hrefNormalized;
  jQuery.support.htmlSerialize;
  jQuery.support.leadingWhitespace;
  jQuery.support.noCloneEvent;
  jQuery.support.opacity;
  jQuery.support.style;
  jQuery.support.submitBubbles;
  jQuery.support.tbody;
  jQuery.prototype.text = function(arg1) {};
  jQuery.prototype.toArray = function() {};
  jQuery.prototype.toggle = function(arg1, arg2, arg3) {};
  jQuery.prototype.toggleClass = function(arg1, flag) {};
  jQuery.prototype.trigger = function(arg1, var_args) {};
  jQuery.prototype.triggerHandler = function(eventType, extraParameters) {};
  jQuery.trim = function(str) {};
  jQuery.type = function(obj) {};
  jQuery.prototype.unbind = function(arg1, arg2) {};
  jQuery.prototype.undelegate = function(arg1, arg2, handler) {};
  jQuery.unique = function(arr) {};
  jQuery.prototype.unload = function(arg1, handler) {};
  jQuery.prototype.unwrap = function() {};
  jQuery.prototype.val = function(arg1) {};
  jQuery.when = function(deferred, deferreds) {};
  jQuery.prototype.width = function(arg1) {};
  jQuery.prototype.wrap = function(arg1) {};
  jQuery.prototype.wrapAll = function(wrappingElement) {};
  jQuery.prototype.wrapInner = function(arg1) {};
})(require('process'));
