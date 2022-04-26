# first of all you need to install the following gems:
# gem install watir 6.19.1
# gem install webdrivers
# gem install rspec
#
# then you can run test
# ruby {path_to_file}/cyrrencycloud_entry_script.rb

require 'watir'
require 'webdrivers'
require 'rspec'
require 'doc_ripper'
require 'pry'
include RSpec::Matchers

class Elements
	attr_reader :driver

	def initialize(driver)
		@driver = driver
	end

	def login_input
		driver.text_field(id: 'id_username')
	end

	def password_input
		driver.text_field(id: 'id_password')
	end

	def submit_login_btn
		driver.button(xpath: "//*[@type='submit']")
	end

	def ce_lnk(ce)
		driver.link(xpath: "//a[text()='#{ce}']")
	end

	def guasto_chx
		driver.checkbox(id: "id_guasto")
	end

	def data_input
		driver.text_field(id: "id_data_resa_guasto_0")
	end

	def ora_btn
		driver.link(xpath: "//a[text()='Adesso']")
	end

	def cp_btn
		driver.element(xpath: "//*[@aria-labelledby='select2-id_pallet-container']")
	end

	def cp_input
		driver.element(xpath: "//*[@class='select2-search__field']")
	end

	def cp_result_btn
		driver.element(xpath: "//*[@class='select2-results__option select2-results__option--highlighted']")
	end
end

class Login < Elements
	attr_reader :driver

	def initialize(driver)
		@driver = driver
	end

	def into_account
		driver.goto 'https://gecotest.brainstorm.it/admin/backend/contatore/'

		login_input.send_keys 'AE100492'
		password_input.send_keys 'AE100492$$123'
		submit_login_btn.click
	end
end

class Contatori < Elements
  attr_reader :driver
	
	def initialize(driver)
		@driver = driver
	end

	def parse_file
		%w[21E4E5KE101093027 21E4E5KE101093023 21E4E5KE101093017]
	end

	def writing_off_meters(list, type, data)
		list.each do |ce|
			driver.goto "https://gecotest.brainstorm.it/admin/backend/contatore/?q=#{ce}"
			ce_lnk(ce).click

			driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", guasto_chx)
			guasto_chx.click
			cp_select(type)
			data_input.send_keys(data)
			ora_btn.click

			driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", submit_login_btn)
			submit_login_btn.click
		end
	end

	private
	def cp_select(type)
		sleep 1
		cp_btn.click
		cp_input.send_keys(type)
		cp_result_btn.click
	end
end


driver = Watir::Browser.new
Elements.new(driver)
login = Login.new(driver)
contatori = Contatori.new(driver)

login.into_account
list = contatori.parse_file
contatori.writing_off_meters(list, "sensi", "16/10/2021")

sleep 3