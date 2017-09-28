package com.sharkjob.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private String email;

    private String name;

    private String password;

    private String skill;

    private String type;

}
