var Filer = require( "filer" ),
    env = require( "./environment" ),
    providerType = env.get( "FILER_PROVIDER" ) || "filer-fs" ,
    Provider = require( providerType );

var defaults = {};

if ( providerType === "filer-s3" ) {
  defaults.bucket = env.get( "S3_BUCKET" );
  defaults.key = env.get( "S3_KEY" );
  defaults.secret = env.get( "S3_SECRET ");
}

module.exports = {
  create: function( options ) {
    Object.keys( defaults ).forEach(function( defaultOption ) {
      options[ defaultOption ] = options[ defaultOption ] || defaults[ defaultOption ];
    });

    return new Filer.FileSystem({
      provider: new Filer.FileSystem.providers.Memory( options )
    });
  }
};
