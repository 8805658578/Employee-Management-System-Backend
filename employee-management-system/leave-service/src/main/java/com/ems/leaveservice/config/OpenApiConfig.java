package com.ems.leaveservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI leaveServiceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Leave Service API")
                        .description("Microservice managing Employee Leave applications, approvals, and history.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("EMS Support")
                                .email("support@ems.com")));
    }
}
