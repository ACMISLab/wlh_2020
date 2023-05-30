package com.ilab.service.util;

import com.alibaba.fastjson.JSONObject;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.*;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.command.BuildImageResultCallback;
import com.github.dockerjava.core.command.PushImageResultCallback;
import org.springframework.stereotype.Component;
import com.github.dockerjava.core.command.PullImageResultCallback;

import java.io.File;
import java.util.List;

@Component
public class MyDockerClient {


    MyDockerClient() {
    }

    static DockerClientConfig custom = DefaultDockerClientConfig.createDefaultConfigBuilder()
        .withDockerHost("tcp://harbor.wanlh.top")
        .withRegistryUsername("admin")
        .withRegistryPassword("gH47PYIvBD")
        .build();
    static DockerClient dockerClient = (DockerClient) DockerClientBuilder.getInstance(custom).build();
    static AuthConfig authConfig = new AuthConfig()
        .withUsername(custom.getRegistryUsername())
        .withPassword(custom.getRegistryPassword());

    public String getInfo() {
        Info info = dockerClient.infoCmd().exec();
        String infoStr = JSONObject.toJSONString(info);
        System.out.println(infoStr);
        return infoStr;
    }

    public void listAllImages() {
        List<Image> images = dockerClient.listImagesCmd().exec();
        for (Image image : images) {
            System.out.println(image.getRepoTags()[0]);
        }
    }

    public void buildImage(String path, String name) {
        File file = new File(path);
        dockerClient.buildImageCmd(file).withTag(name).exec(callback).awaitImageId();

//        dockerClient.buildImageCmd().with
    }

    public void pushImage(String name) {
        dockerClient.pushImageCmd(name).withAuthConfig(authConfig).exec(push).awaitSuccess();
    }

    public static BuildImageResultCallback callback = new BuildImageResultCallback() {
        @Override
        public void onNext(BuildResponseItem item) {
            System.out.println("build callback " + item);
            super.onNext(item);
        }
    };

    public static PushImageResultCallback push = new PushImageResultCallback() {
        @Override
        public void onNext(PushResponseItem item) {
            System.out.println("id:" + item.getId() + " status: " + item.getStatus());
            super.onNext(item);
        }

        @Override
        public void onComplete() {
            System.out.println("Image pushed completed!");
            super.onComplete();
        }
    };

    public static void main(String[] args) {
        String serverUrl = "tcp://harbor.wanlh.top/";
        DefaultDockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
            .withDockerHost(serverUrl)
            .withRegistryUsername("admin")
            .withRegistryPassword("gH47PYIvBD")
            .build();
        DockerClient dockerClient = DockerClientBuilder.getInstance(config).build();

        String imageName = "ilab/python:2.7";
        String registryUrl = "https://harbor.wanlh.top/";
        String username = "admin";
        String password = "gH47PYIvBD";

        AuthConfig authConfig = new AuthConfig()
            .withRegistryAddress(registryUrl)
            .withUsername(username)
            .withPassword(password);

        dockerClient.pullImageCmd(imageName)
            .withAuthConfig(authConfig)
            .exec(new PullImageResultCallback())
            .awaitSuccess();

        CreateContainerResponse container = dockerClient.createContainerCmd(imageName).exec();
        dockerClient.startContainerCmd(container.getId()).exec();
    }


}
