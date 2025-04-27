package hidden_gems;

public class Encryptor {
    public Encryptor() {}

    public String THIS(String password) {
        String temp = "";
        for (int i = 0; i < password.length(); i++) {
            int ac = password.charAt(i);
            char c = (char) (ac + i);
            temp = temp.concat(String.valueOf(c));
        }
        return temp;
    }
}
