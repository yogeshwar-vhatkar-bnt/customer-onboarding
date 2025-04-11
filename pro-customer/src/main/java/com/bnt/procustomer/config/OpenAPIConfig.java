package com.bnt.procustomer.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Customer Service API")
                .version("1.0")
                .description("Documentation for Customer Service REST API")
                .contact(new Contact()
                    .name("Yogeshwar Vhatkar")
                    .email("yogeshwar.vhatkar@bnt-soft.com")));
    }
} 