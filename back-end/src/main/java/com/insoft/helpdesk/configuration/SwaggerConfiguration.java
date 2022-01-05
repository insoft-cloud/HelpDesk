package com.insoft.helpdesk.configuration;


import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.servlet.mvc.method.RequestMappingInfoHandlerMapping;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.spring.web.plugins.WebFluxRequestHandlerProvider;
import springfox.documentation.spring.web.plugins.WebMvcRequestHandlerProvider;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;


@Configuration
public class SwaggerConfiguration {

    final String version = "v1";

    final String swaggerPackageName = "com.insoft.helpdesk.application.adapter";

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
