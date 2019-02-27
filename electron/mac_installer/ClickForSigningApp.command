#!/bin/bash

RootDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ExtenDir="/release-builds/Ganga.com-darwin-x64/Ganga.com.app/Contents/Frameworks"
ActualappDir="$RootDIR/release-builds/Ganga.com-darwin-x64/Ganga.com.app"
DIR=$RootDIR$ExtenDir

for entry in "$DIR"/*
do

filename=$(basename "$entry")
extension="${filename##*.}"
filename="${filename%.*}"

shopt -s nocasematch
if [ $extension == "framework" ] || [ $extension == "app" ]
then

rfile="${filename// /\\ }"
fpath=$DIR"/"$rfile
execmd="codesign --sign 2A89S32MXL "$fpath"."$extension
eval "$execmd"

fi

done;


eval "codesign --sign 2A89S32MXL $ActualappDir"
eval "spctl -a-v $ActualappDir"
