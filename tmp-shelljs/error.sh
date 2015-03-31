#!/usr/bin/env bash
cd /tmp
git init tmp
cd tmp
git rev-parse --abbrev-ref HEAD
exit 1
