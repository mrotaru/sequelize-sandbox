# mysql
# -----

class { '::mysql::server':
  root_password => 'pass'
  $databases = {
    'sequelize' => {
      ensure  => 'present',
      charset => 'utf8',
    },
  }
}

# node
# ----

class { 'nodejs':
  version      => 'stable',
  make_install => false,
}
