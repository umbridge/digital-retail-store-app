package SmartRetailFramework.exception.domain;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(String message, UserNotFoundException e) {
        super(message);
    }
}
