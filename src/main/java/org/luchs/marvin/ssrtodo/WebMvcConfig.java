package org.luchs.marvin.ssrtodo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("classPath:/static/index.html")
    private Resource indexHtml;

    private final String[] assets = {
        "/**/*.css",
        "/**/*.png",
        "/**/*.gif",
        "/**/*.svg",
        "/**/*.jpg",
        "/**/*.js",
        "/**/*.js.map",
        "/**/*.ico",
        "/**/*.eot",
        "/**/*.ttf",
        "/**/*.woff",
        "/**/*.woff2"
    };

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler(assets)
            .addResourceLocations("classpath:/static/");

        registry.addResourceHandler("/**")
            .addResourceLocations("classpath:/static/index.html")
            .resourceChain(true)
            .addResolver(new FallbackPathResourceResolver());
    }

    private class FallbackPathResourceResolver extends PathResourceResolver {
        @Override
        public Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource requestedResource = location.createRelative(resourcePath);

            if (requestedResource.exists() && requestedResource.isReadable()) {
                return requestedResource;
            } else {
                return indexHtml;
            }
        }
    }

}