#!/bin/sh

remove_if_directory_exists() {
	if [ -d "$1" ]; then rm -Rf "$1"; fi
}

create_if_directory_does_not_exists() {
	if [ ! -d "$1" ]; then mkdir "$1"; fi
}

BRANCH="master";

LATEST_HASH=$(git ls-remote https://$NEXT_PUBLIC_PERPS_CHARTING_ACCESS_TOKEN@github.com/tradingview/charting_library/ $BRANCH | grep -Eo '^[[:alnum:]]+')

remove_if_directory_exists "$LATEST_HASH"

git clone -q --depth 1 -b "$BRANCH" https://$NEXT_PUBLIC_PERPS_CHARTING_ACCESS_TOKEN@github.com/tradingview/charting_library/ "$LATEST_HASH"

create_if_directory_does_not_exists 'public'
create_if_directory_does_not_exists 'public/static'

remove_if_directory_exists "public/static/charting_library"
remove_if_directory_exists "public/static/datafeeds"

cp -r "$LATEST_HASH/charting_library" public/static
cp -r "$LATEST_HASH/datafeeds" public/static

remove_if_directory_exists "$LATEST_HASH"