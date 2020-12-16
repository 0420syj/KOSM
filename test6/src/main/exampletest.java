import java.util.LinkedList;

public class exampletest {
public static void main(String args[])
{   LinkedList<String> players = new LinkedList<String>();
    players.add("asdad");
    players.add("asdad2");
    players.add("asdad3");
    players.add("asdad4");
    players.add("asdad5");
    players.add("asda6");
    players.add("asdad7");
    players.add("asdad10");
    players.add("asdad8");
    players.add("asdad9");
    ListIterator<String> i1 = players.listIterator(0);
    while (i1.hasNext()) {
    String p1 = i1.next();
    ListIterator<String> i2 = players.listIterator.get(8);
    while (i2.hasNext()) {
        String p2 = i2.next();
        System.out.println("Interact: " + p1 + ", " + p2);
    }
}


}

}