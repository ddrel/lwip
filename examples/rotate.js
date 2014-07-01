/**
 * Example for using LWIP to rotate an image.
 * This example uses the 'async' module for control flow.
 */

var path = require('path'),
    fs = require('fs'),
    lwip = require('../'),
    async = require('async'),
    rotateBy = process.argv[2],
    bgColor = [90, 55, 40],
    infile = process.argv[3],
    outfile = process.argv[4];

async.waterfall([

    // open image
    function(next) {
        lwip.open(infile, next);
    },

    // rotate image
    function(image, next) {
        image.rotate(rotateBy, bgColor, next);
    },

    // compress to jpeg and get image as buffer
    function(image, next) {
        image.toBuffer('jpg', {
            quality: 100
        }, next);
    },

    function(buffer, next) {
        fs.writeFile(outfile, buffer, {
            encoding: 'binary',
            flag: 'w'
        }, next);
        // can also, for example, do buffer.toString('base64'), send it over
        // the network and display on a browser... without ever saving the
        // result to disk.
    }

], function(err) {
    if (err) return console.log(err);
    console.log('done')
});
