class LargestElement1{
    static int findLargest(int[] arr){
        int max = 0;
        for(int i=0;i<arr.length;i++){
            if(arr[i] > max){
                max = arr[i];
            }
        }
        return max;
    }
    public static void main(String[] args){
        int[] arr = {10, 25, 78, 90, 56};
        System.out.println("Largest element: "+ findLargest(arr));
    }
}