import java.util.*;
class Add
{
        int sum(int a,int b)
        {
            return a+b;
        }
              int sum(int a,int b,int c)
        {
            return a+b+c;
                  
        }
    public static void main(String args [])
    {
        Add ob = new Add ();
       System.out.println("Sum="+ ob.sum(10,20)) ;
        System.out.println("Sum="+ ob.sum(20,30,10));
    }
}