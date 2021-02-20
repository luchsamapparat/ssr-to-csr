package org.luchs.marvin.ssrtodo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import java.util.Arrays;
import java.util.Locale;

@SpringBootApplication
public class SsrTodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsrTodoApplication.class, args);
	}

	@Bean("localeResolver")
	public LocaleResolver acceptHeaderLocaleResolver() {
		AcceptHeaderLocaleResolver resolver = new AcceptHeaderLocaleResolver();

		resolver.setDefaultLocale(Locale.ENGLISH);
		resolver.setSupportedLocales(Arrays.asList(
			Locale.GERMAN,
			Locale.ENGLISH
		));

		return resolver;
	}
}
