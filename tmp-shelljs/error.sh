#!/usr/bin/env bash
echo "fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree." 1>&2
echo "Use '--' to separate paths from revisions, like this:" 1>&2
echo "'git <command> [<revision>...] -- [<file>...]'" 1>&2
echo "HEAD" 1>&2
exit 1
