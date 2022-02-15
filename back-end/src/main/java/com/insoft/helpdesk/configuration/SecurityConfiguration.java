package com.insoft.helpdesk.configuration;

import com.insoft.helpdesk.util.filter.JwtAuthFilter;
import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.util.filter.HelpdeskFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                //.antMatchers("/api/v1/sign/**").permitAll()
                //.antMatchers("/swagger-ui/**").permitAll()
                //.antMatchers("/swagger-resources/**").permitAll()
                //.anyRequest().hasAuthority("USER")
                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new JwtAuthFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(new HelpdeskFilter(jwtTokenProvider),  WebAsyncManagerIntegrationFilter.class);
    }

    @Override
    public void configure(WebSecurity web)
    {
        web
                .ignoring()
                .antMatchers( "/v3/api-docs")
                .antMatchers( "/configuration/ui")
                .antMatchers("/swagger-resources")
                .antMatchers( "/configuration/security")
                .antMatchers( "/swagger-ui.html")
                .antMatchers( "/webjars/**")
                .antMatchers( "/swagger/**");

    }


}
