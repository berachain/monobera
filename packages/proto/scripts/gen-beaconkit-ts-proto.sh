#!/usr/bin/env bash

set -eo pipefail

mkdir -p ./ts-proto-gen

ROOT_OUT="./ts-proto-gen/beacon-kit-ts"

getName() {
    echo $1 | cut -d / -f 6 | xargs basename
}

git clone -b main https://github.com/berachain/berachain-v2

proto_dirs=$(find -H ./berachain-v2/indexer/proto/core/beacon/v1alpha1 -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq )
for dir in $proto_dirs; do
  for proto_file in $(find "${dir}" -maxdepth 1 \( -name 'service.proto' \)); do
    if [[ ! -z "$proto_file" ]]; then
      file_name=$(getName "${proto_file}")
      path_name="${ROOT_OUT}/${file_name}/"
      buf generate -o $path_name --template ./buf.gen.yaml $proto_file
    fi
  done
done

rm -rf berachain-v2

