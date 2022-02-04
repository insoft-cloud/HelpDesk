package com.insoft.helpdesk.util.filter;

import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.entity.log.HelpDeskLog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.charset.StandardCharsets;

@Slf4j
public class HelpdeskFilter implements Filter  {


    final JwtTokenProvider jwtTokenProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    public HelpdeskFilter (JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        ServletWrapper servletWrapper = new ServletWrapper((HttpServletRequest)request);
        chain.doFilter(servletWrapper, response);
        HttpServletRequest httpServletRequest = (HttpServletRequest)servletWrapper.getRequest();
        String token = httpServletRequest.getHeader("X-AUTH-TOKEN");
        HelpDeskLog helpDeskLog = new HelpDeskLog();
        if(token != null && !token.isEmpty()){
            try{
                helpDeskLog.setUser(jwtTokenProvider.getUserPk(token));
            }catch (Exception e){

            }
        }
        helpDeskLog.setBody(getServletInputStream(servletWrapper.getInputStream()));
        helpDeskLog.setMethod(httpServletRequest.getMethod());
        helpDeskLog.setRequestUrl(httpServletRequest.getRequestURI());
        log.info(helpDeskLog.toString());
    }


    private String getServletInputStream(InputStream inputStream)  {
        String body = "";
        BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
        try {
            body = new String(bufferedInputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            return body;
        }
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
