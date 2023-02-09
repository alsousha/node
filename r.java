public static char top(Stack<Character> st){
        char tmpNum = st.pop();
        st.push(tmpNum);
        return tmpNum;
    }
    public static void task2_12(Stack<Character> st, int k){
        int i;
        boolean flag = true;
        Stack<Character> tmp = new Stack<Character>();
        for(i=0;i<k && flag; i++){
            if(!st.isEmpty()){
                tmp.push(st.pop());
            }else flag = false;

        }
        if(!flag) System.out.println("Error");
        else{
            System.out.println(top(st));
        }
        while(!tmp.isEmpty())
            st.push(tmp.pop());
    }

    public static void main(String[] args) {
        Stack<Character> st = new Stack<Character>();
        Character[]arr = {'d','d','e','4'};
        int i;
        for(i=0;i<arr.length; i++)
            st.push(arr[i]);

        task2_12(st, 4);
    }