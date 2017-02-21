import js.Node.*;
import js.npm.Haxe.haxe;


class Test {
    static function main(){
        console.log('Starting test...');
        var expected = process.env['npm_package_config_version'];

        haxe.exec(['-version'], function(err,stdout,stderr){
            var assert = StringTools.trim(stderr) == expected;
            console.assert(assert,"Versions should match");

            if( assert ) {
                console.log('Success. (version is $expected)');
            }else{
                process.exit(1);
            }
        });
    }
}