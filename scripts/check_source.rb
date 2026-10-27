#!/usr/bin/env ruby
# Lightweight source validation; requires only Ruby's standard library.
require "date"
require "yaml"

Dir.chdir(File.expand_path("..", __dir__))

errors = []
checked = 0

validate = lambda do |path, content, front_matter|
  begin
    data = YAML.safe_load(content, permitted_classes: [Date, Time], aliases: true, filename: path)
    if front_matter && !data.nil? && !data.is_a?(Hash)
      raise ArgumentError, "front matter must be a YAML mapping"
    end
    checked += 1
  rescue Psych::Exception, ArgumentError => error
    errors << "#{path}: #{error.message}"
  end
end

Dir.glob(["_config*.{yml,yaml}", "_data/**/*.{yml,yaml}", ".github/workflows/*.{yml,yaml}"]).sort.each do |path|
  validate.call(path, File.read(path), false)
end

Dir.glob(["*.{md,markdown,html}", "_pages/**/*.{md,markdown,html}",
          "_layouts/**/*.html", "_includes/**/*.html", "assets/**/*.{scss,css,js}"]).sort.each do |path|
  lines = File.readlines(path)
  next unless lines.first && lines.first.strip == "---"

  closing = (1...lines.length).find { |index| lines[index].strip == "---" }
  unless closing
    errors << "#{path}: missing closing front-matter delimiter"
    next
  end

  validate.call(path, lines[1...closing].join, true)
end

unless errors.empty?
  warn errors.join("\n")
  exit 1
end

puts "Checked #{checked} YAML documents and front-matter blocks."
