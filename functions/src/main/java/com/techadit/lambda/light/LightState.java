package com.techadit.lambda.light;

public class LightState {

    private Boolean state;

    public LightState(Boolean state) {
        this.state = state;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }
}
