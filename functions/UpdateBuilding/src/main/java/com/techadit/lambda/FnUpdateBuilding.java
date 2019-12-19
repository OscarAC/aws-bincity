package com.techadit.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class FnUpdateBuilding implements RequestHandler<Object, String> {


    @Override
    public String handleRequest(Object o, Context context) {

        return "FnUpdateBuilding";
    }
}
