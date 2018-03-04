/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START functions_imagemagick_setup]
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const storage = require('@google-cloud/storage')();
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
// [END functions_imagemagick_setup]

// [START functions_imagemagick_analyze]
// Blurs uploaded images that are flagged as Adult or Violence.
exports.blurOffensiveImages = (event) => {
  const object = event.data;

  // Exit if this is a deletion or a deploy event.
  if (object.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  } else if (!object.name) {
    console.log('This is a deploy event.');
    return;
  }

  //const file = storage.bucket(object.bucket).file(object.name);
  const file = 'gs://'+object.bucket+'/'+object.name;
  console.log(object.bucket);
  console.log (object.name);
  console.log(`Analyzing ${file.name}.`);

  client.safeSearchDetection(file).then(response => {
  //client.safeSearchDetection('gs://hn-image-bucket/image3.jpg').then(response => {
	const detections = response[0].safeSearchAnnotation;
	console.log(`Adult: ${detections.adult}`);
    	console.log(`Spoof: ${detections.spoof}`);
    	console.log(`Medical: ${detections.medical}`);
    	console.log(`Violence: ${detections.violence}`);
	}).catch((err) => {
      		console.error(`Failed to analyze ${file.name}.`, err);
    	});

};
