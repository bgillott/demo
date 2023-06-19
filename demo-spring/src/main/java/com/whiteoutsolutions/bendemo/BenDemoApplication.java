package com.whiteoutsolutions.bendemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@ComponentScan("com.*.*")
@SpringBootApplication
@EnableJpaAuditing
public class BenDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BenDemoApplication.class, args);
	}

}
