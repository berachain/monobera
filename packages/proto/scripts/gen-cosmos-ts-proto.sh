#!/usr/bin/env bash

set -eo pipefail

mkdir -p ./ts-proto-gen

ROOT_OUT="./ts-proto-gen/cosmos-ts"

git clone https://github.com/cosmos/cosmos-sdk

proto_dirs=$(find -H ./cosmos-sdk/proto/cosmos -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq )
for dir in $proto_dirs; do
  for proto_file in $(find "${dir}" -maxdepth 4 \( -name 'query.proto' -o -name 'tx.proto' -o -name 'keys.proto' \)); do
    if [[ ! -z "$proto_file" ]]; then
      buf generate -o $ROOT_OUT --template ./buf.gen.yaml $proto_file
    fi
  done
done

rm -rf cosmos-sdk
