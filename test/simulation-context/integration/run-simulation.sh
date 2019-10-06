#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

readonly current="$( cd "$(dirname "${0}")" ; pwd -P )"
readonly out_file="/tmp/${1}.out"
readonly wait=${2}
shift

${SC_VLY_ROOT}/bin/volley ${@} >${out_file} 2>/dev/null & disown
sleep ${wait}
ps aux | grep '[v]olley' | awk '{ print $2 }' | xargs kill -9

cat ${out_file}

rm -rf ${out_file}