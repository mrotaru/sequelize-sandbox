# mysql
# -----
class { '::mysql::server':
  root_password => 'asdasd',
}

mysql_database { 'sequelize':
  ensure  => 'present',
  charset => 'utf8',
}

# node
# ----

class { 'nodejs':
  version      => 'stable',
  make_install => false,
}
