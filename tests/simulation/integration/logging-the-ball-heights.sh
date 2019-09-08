#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

readonly current="$( cd "$(dirname "$0")" ; pwd -P )"
readonly out_file="/tmp/logging-the-ball-heights.out"

${SC_VLY_ROOT}/bin/volley >${out_file} 2>/dev/null & disown
sleep 4
ps aux | grep '[v]olley' | awk '{ print $2 }' | xargs kill -9

cat ${out_file}

rm -rf ${out_file}