import java.applet.Applet;
import java.awt.*;
import java.awt.event.*;

/*
<applet code="ButtonApplet" width=300 height=200>
</applet>
*/

public class ButtonApplet extends Applet implements ActionListener {
    Button btn;
    String message = "";

    public void init() {
        btn = new Button("Click Me");
        add(btn); // add button to applet
        btn.addActionListener(this); // register event listener
    }

    public void actionPerformed(ActionEvent e) {
        message = "Button Clicked!";
        repaint(); // call paint() to refresh display
    }

    public void paint(Graphics g) {
        g.drawString(message, 100, 100);
    }
}
