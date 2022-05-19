package com.insoft.helpdesk.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;


@Configuration
public class SwaggerConfiguration {

    final static String version = "v1";

    final static String swaggerPackageName = "com.insoft.helpdesk.application.adapter";

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30) // open api spec 3.0
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage(swaggerPackageName))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        String description = "COMPANY : IN-SOFT";
        return new ApiInfoBuilder()
                .title("HELP DESK SWAGGER")
                .description(description)
                .version(version)
                .build();
    }

}
