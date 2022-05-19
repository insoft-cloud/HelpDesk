package com.insoft.helpdesk.util.filter;

import com.insoft.helpdesk.application.domain.common.JwtTokenProvider;
import com.insoft.helpdesk.application.domain.entity.log.HelpDeskLog;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
public class HelpDeskFilter implements Filter  {


    final transient JwtTokenProvider jwtTokenProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    public HelpDeskFilter(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        chain.doFilter(request, response);
        HttpServletRequest httpServletRequest = (HttpServletRequest)request;
        String token = httpServletRequest.getHeader("X-AUTH-TOKEN");
        HelpDeskLog helpDeskLog = new HelpDeskLog();
        if(token != null && !token.isEmpty()) {
            try {
                helpDeskLog.setUser(jwtTokenProvider.getUserPk(token));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        helpDeskLog.setMethod(httpServletRequest.getMethod());
        helpDeskLog.setRequestUrl(httpServletRequest.getRequestURI());
        if(log.isInfoEnabled()) {
            log.info(helpDeskLog.toString());
        }
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
