#!/usr/bin/env bash

set -eo pipefail

mkdir -p ./ts-proto-gen

ROOT_OUT="./ts-proto-gen/berachain"

getName() {
    echo $1 | cut -d / -f 6 | xargs basename
}

git clone https://github.com/berachain/berachain

proto_dirs=$(find -H ./berachain/proto -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq )
for dir in $proto_dirs; do
  # we only care about gov msgs
  for proto_file in $(find "${dir}" -maxdepth 1 \( -name 'governance.proto' -o -name 'tx.proto' \)); do
    echo $proto_file
    if [[ ! -z "$proto_file" ]]; then
      file_name=$(getName "${proto_file}")
      path_name="${ROOT_OUT}/${file_name}/"
      buf generate -o $path_name --template ./buf.gen.yaml $proto_file
    fi
  done
done

rm -rf berachain

