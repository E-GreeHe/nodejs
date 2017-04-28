//introduce events module
// 引入 events 模块
var events = require('events');
//new EventEmitter();
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
eventEmitter.on('event1', function() {
	setTimeout(function() {
		console.log("1")
		eventEmitter.emit('event2');
	}, 1000)
});
eventEmitter.on('event2', function() {
	setTimeout(function() {
		console.log("2")
		eventEmitter.emit('event3');
	}, 1000)
});
eventEmitter.on('event3', function() {
	setTimeout(function() {
		console.log("3")
	}, 1000)
});
//触发事件1
eventEmitter.emit('event1');