#!/usr/bin/env bash
echo "fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree."
echo "Use '--' to separate paths from revisions, like this:"
echo "'git <command> [<revision>...] -- [<file>...]'"
echo "HEAD"
exit 1
