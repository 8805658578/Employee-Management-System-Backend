package com.ems.departmentservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI departmentServiceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Department Service API")
                        .description("Microservice managing Department entities and structures.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("EMS Support")
                                .email("support@ems.com")));
    }
}
