"use strict";

const fs = require("fs");
const crypto = require('crypto');
const inputName = "input.txt";
const outptName1 = "output1.txt";
const outptName2 = "output2.txt";

const Transform = require("stream").Transform;
const Readable = require("stream").Readable;
const Writable = require("stream").Writable;

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  max = Math.floor(Math.random() * (max - min + 1));
  return max + min;
};

fs.access(inputName, fs.constants.R_OK | fs.constants.W_OK, (err) => {
	if(err) {
		console.log('no access!');
	}
	else 
	{
		/*1 часть */
		
		const input = fs.createReadStream(inputName);
		const output1 = fs.createWriteStream(outptName1);

		const hash = crypto.createHash('md5');
		input.pipe(hash).pipe(process.stdout);
		input.pipe(hash).pipe(output1);
		
		/* 2 часть */
		const output2 = fs.createWriteStream(outptName2);
		const MyTransform1 = new MyTransformClass1;
		input.pipe(MyTransform1).pipe(process.stdout);
		input.pipe(MyTransform1).pipe(output2);		
		
		/* 3 часть */
		const MyTransform2 = new MyTransformClass2;
		const MyReadable = new MyReadableClass;
		const MyWritable = new MyWritableClass;
		MyReadable.pipe(MyTransform2).pipe(MyWritable);
		
	}
});

class MyTransformClass1 extends Transform {
	constructor(options) {
		super(options);
		this.hash = crypto.createHash('md5');
	}
	_transform(chunk, encoding, callback){
		chunk = chunk.toString('hex');
		this.hash.push(chunk);
		callback();
	}
	_flush(callback){
		let hex = this.hash.digest('hex');
		this.push(hex);
		callback();
	}
}
class MyReadableClass extends Readable{
	_read(){
		this.push(random(0, 100).toString());
	}
}

class MyWritableClass extends Writable{
	_write(chunk, encoding, callback){
		console.log(chunk.toString());
		callback();
	}
}

class MyTransformClass2 extends Transform{
	modify(str) {
		str = '\n' + str + '!!!';
		return str;
	}
	
	_transform(chunk, encodind, callback){
		setTimeout(() => {			
			this.push(this.modify(chunk.toString()));
			callback();
		}, 1000);
	}
}