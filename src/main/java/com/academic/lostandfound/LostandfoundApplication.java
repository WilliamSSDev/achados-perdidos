package com.academic.lostandfound;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class LostandfoundApplication {

	@Autowired
    private static String welcomeToBeanWorld;

	public static void main(String[] args) {
		ConfigurableApplicationContext context =
            SpringApplication.run(LostandfoundApplication.class, args);
		System.out.println("API de Achados e Perdidos rodando com sucesso!");

		String welcomeToBeanWorld = context.getBean(String.class);

		System.out.println(welcomeToBeanWorld);



	}

}
