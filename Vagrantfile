# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu-13.10-current"
  config.vm.box_url="https://cloud-images.ubuntu.com/vagrant/saucy/current/saucy-server-cloudimg-amd64-vagrant-disk1.box "
  
  config.vm.define :dev do |dev_config|
      dev_config.vm.network :private_network, ip: "192.168.33.33"
      dev_config.vm.provision :puppet do |dev_puppet|
         dev_puppet.manifests_path = "puppet/manifests"
         dev_puppet.module_path = "puppet/modules"
         dev_puppet.options="--verbose --debug"
         require 'rbconfig'
         if (RbConfig::CONFIG['host_os'] =~ /mswin|mingw|cygwin/)
             dev_puppet.options << " --color=false"
         end
      end
  end
end
