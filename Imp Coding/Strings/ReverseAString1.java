class ReverseAString1{
    public static String reverse(String str){
        char[] arr = str.toCharArray();
        int left = 0, right = arr.length - 1;
        if(left < right){
            char temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        return new String(arr);
    }

    public static void main(String[] args){
        String str = "Java";
        System.out.println("Reversed string: "+ reverse(str));
    }
}