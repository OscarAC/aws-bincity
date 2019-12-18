package com.techadit.lambda.light;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class FnLightState implements RequestHandler<Object, LightState> {

    @Override
    public LightState handleRequest(Object o, Context context) {

        context.getLogger().log("Light State Lambda: " + o);

        return new LightState(false);
    }
}
