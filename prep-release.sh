#!/usr/bin/env bash

set -e

function check_changes() {
    local delta=$(git diff)
    if [[ "$delta" != "" ]]; then
        echo "uncommitted changes in working directory" 1>&2
        exit 1
    fi
}

node scripts/update-version.js
npm install
npm run build

check_changes

node scripts/tag-commit.js
cd dist && zip -r ../extension.zip *
