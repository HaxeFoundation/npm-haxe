
module.exports = function ( platform, arch, majorVersion, nightly ) {

    var version = majorVersion;
    var isNightly = !!nightly;

    var url;
    switch ( isNightly ) {
        case true: 
            url = 'http://hxbuilds.s3-website-us-east-1.amazonaws.com/builds/haxe/';
            switch( platform ) {
                case 'linux':
                    url += 'linux';
                    switch( arch ) {
                        case 'x64': 
                            url += '64';
                            break;
                        case 'ia32':
                            url += '32';
                            break;
                    }
                    break;
                case 'darwin':
                    url += 'mac';
                    break;
                case 'win32':
                case 'win64':
                    url += 'windows';
                    break;
            }
            url += '/haxe_'+nightly+'.tar.gz';
            break;
        default: 
            url = 'https://haxe.org/website-content/downloads/' + version + '/downloads/haxe-' + version + '-';
            switch ( platform ) {
                case 'linux': 
                    url += 'linux';
                    switch( arch ) {
                        case 'x64': 
                            url += '64';
                            break;
                        case 'ia32':
                            url += '32';
                            break;
                    }
                    url += '.tar.gz';
                    break;
                case 'darwin':
                    url += 'osx';
                    url += '.tar.gz';
                    break;
                case 'win32':
                case 'win64':
                    url += 'win';
                    url += '.zip';
                    break;
                default: 
                    console.error('Haxe is not compatible with your platform');
                    throw 'error';
            }
    }
    
    return url;
}
