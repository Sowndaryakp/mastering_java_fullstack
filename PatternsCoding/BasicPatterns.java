class BasicPatterns{
    public static void main(String[] args){

        // //1
//         *****
//         *****
//         *****
//         *****
//         *****

//         for(int i=1;i<=5;i++){ //row
//             for(int j=1;j<=5;j++){ //column
//                 System.out.print("*" + " ");
//             }
//             System.out.println();
//         }


        // //2
//         11111
//         22222
//         33333
//         44444
//         55555

//         for(int i=1;i<=5;i++){
//             for(int j=1;j<=5;j++){
//                 System.out.print(i + " ");
//             }
//             System.out.println();
//         }

        // //3
//         12345
//         12345
//         12345
//         12345
//         12345

//         for(int i=1;i<=5;i++){
//             for(int j=1;j<=5;j++){
//                 System.out.print(j + " ");
//             }
//             System.out.println();
//         }

        // //4
//         55555
//         44444
//         33333
//         22222
//         11111

//         for(int i=5;i>=1;i--){
//             for(int j=5;j>=1;j--){
//                 System.out.print(i + " ");
//             }
//             System.out.println();
//         }

        // //5
//         54321
//         54321
//         54321
//         54321
//         54321

//         for(int i=5;i>=1;i--){
//             for(int j=5;j>=1;j--){
//                 System.out.print(j + " ");
//             }
//             System.out.println();
//         }

        // //6
//         1 2 3 4 5
//         6 7 8 9 10
//         11 12 13 14 15
//         16 17 18 19 20
//         21 22 23 24 25

//         int n = 5;
//         int k = 1;
//         for(int i=1;i<=n;i++){
//             for(int j=1;j<=n;j++){
//                 System.out.print(k + " ");
//                 k++;
//             }
//             System.out.println();
//         }

        // //7
//         1 3 5 7 9
//         11 13 15 17 19
//         21 23 25 27 29
//         31 33 35 37 39
//         41 43 45 47 49

//         int n = 5;
//         int k = 1;
//         for(int i=1;i<=n;i++){
//             for(int j=1;j<=n;j++){
//                 System.out.print(k + " ");
//                 k += 2;
//             }
//             System.out.println();
//         }

        // //8
//         2 4 6 8 10
//         12 14 16 18 20
//         22 24 26 28 30
//         32 34 36 38 40
//         42 44 46 48 50

//         int n = 5;
//         int k = 2;
//         for(int i=1;i<=n;i++){
//             for(int j=1;j<=n;j++){
//                 System.out.print(k + " ");
//                 k += 2;
//             }
//             System.out.println();
//         }

        // //9
//         1 2 3 4 5
//         2 4 6 8 10
//         3 6 9 12 15
//         4 8 12 16 20
//         5 10 15 20 25

//         int n = 5;
//
//         for(int i=1;i<=n;i++){
//             for(int j=1;j<=n;j++){
//                 System.out.print(j * i + " ");
//             }
//             System.out.println();
//         }

        // //10
//         1 1 2 1 3 1
//         1 2 2 2 3 2
//         1 3 2 3 3 3
//         1 4 2 4 3 4
//         1 5 2 5 3 5
        
//         for(int i=1;i<=5;i++){
//             for(int j=1;j<=3;j++){
//                 System.out.print(j + " " + i + " ");
//             }
//             System.out.println();
//         }

        // //11
//         1 1 1 2 1 3
//         2 1 2 2 2 3
//         3 1 3 2 3 3
//         4 1 4 2 4 3
//         5 1 5 2 5 3

//         for(int i=1;i<=8;i++){
//             for(int j=1;j<=3;j++){
//                 System.out.print(i + " " + j + " ");
//             }
//             System.out.println();
//         }

        // //12
//         1 6 11 16 21
//         2 7 12 17 22
//         3 8 13 18 23
//         4 9 14 19 24
//         5 10 15 20 25

//         int n=5;
//         int k;
//         for(int i=1;i<=n;i++){
//             k=i;
//             for(int j=1;j<=n;j++){
//                 System.out.print(k + " ");
//                 k+=n;
//             }
//             System.out.println();
//         }

        // //13
//         1 10 11 20 21
//         2 9 12 19 22
//         3 8 13 18 23
//         4 7 14 17 24
//         5 6 15 16 25

//         int n=5;
//         int x;
//         int y;
//         for(int i=1;i<=n;i++){
//             x=i;
//             y=n-i + 1;
//             for(int j=1;j<=n;j++){
//                if(j%2 == 1){
//                     System.out.print(x + " ");
//                }else{
//                     System.out.print(y + " ");
//                }
//                x = x + n;
//                y = y + n;
//             }
//             System.out.println();
//         }

        // //14
//         5 10 15 20 25
//         4 9 14 19 24
//         3 8 13 18 23
//         2 7 12 17 22
//         1 6 11 16 21

//         int n = 5;
//         int x;
//         for(int i=1;i<=n;i++){
//             x = n - i + 1;
//             for(int j=1;j<=n;j++){
//                 System.out.print(x + " ");
//                 x = x + n;
//             }
//             System.out.println();
//         }

        // //15
//         5 6 15 16 25
//         4 7 14 17 24
//         3 8 13 18 23
//         2 9 12 19 22
//         1 10 11 20 21

//         int n=5;
//         int x;
//         int y;
//         for(int i=1;i<=n;i++){
//             x=i;
//             y=n-i + 1;
//             for(int j=1;j<=n;j++){
//                if(j%2 != 1){
//                     System.out.print(x + " ");
//                }else{
//                     System.out.print(y + " ");
//                }
//                x = x + n;
//                y = y + n;
//             }
//             System.out.println();
//         }

        // //16
//          1 2 3 4 5
//          2 3 4 5 6
//          3 4 5 6 7
//          4 5 6 7 8
//          5 6 7 8 9

//         int n=5;
//         for(int i= 1; i<=n; i++){
//         for(int j=1; j<=n; j++){
//              System.out.print((i + j - 1) + " ");
//           }
//         System.out.println();
//          }

        // //17
//        1 3 5 7 9
//        3 5 7 9 11
//        5 7 9 11 13
//        7 9 11 13 15
//        9 11 13 15 17

//        int n = 5;
//        for(int i = 1; i<=n; i++){
//            for(int j = 1; j<= n; j++){
//                System.out.print((2 * (i+j) - 3) + " ");
//            }
//            System.out.println();
//        }

        // //18
//        0 1 0 1 0
//        1 0 1 0 1
//        0 1 0 1 0
//        1 0 1 0 1
//        0 1 0 1 0
//
//        int n = 5;
//        for(int i =1; i <= n; i++){
//            for(int j = 1; j<=n; j++){
//                System.out.print((i+j)%2 + " ");
//            }
//            System.out.println();
//        }

        // //19
//        1 0 1 0 1 0
//        0 1 0 1 0 1
//        1 0 1 0 1 0
//        0 1 0 1 0 1
//        1 0 1 0 1 0

//        int n = 5;
//        for(int i =1; i<=n; i++){
//            for(int j = 0; j<=n; j++){
//                System.out.print((i+j)%2 + " ");
//            }
//            System.out.println();
//        }


        // //20
//        1 0 1 0 1
//        0 0 0 0 0
//        1 0 1 0 1
//        0 0 0 0 0
//        1 0 1 0 1

//        int n =5;
//        for(int i =1; i<=n; i++){
//            for(int j =1; j<=n; j++){
//                System.out.print((i*j) % 2 + " ");
//            }
//            System.out.println();
//        }

        // //21
//        0 1 0 1 0
//        0 0 0 0 0
//        0 1 0 1 0
//        0 0 0 0 0
//        0 1 0 1 0

//        int n =5;
//        for(int i =1; i<=n; i++){
//            for(int j =0; j<n; j++){
//                System.out.print((i*j) % 2 + " ");
//            }
//            System.out.println();
//        }

        // //22
//        0 0 0 0 0
//        1 1 1 1 1
//        0 0 0 0 0
//        1 1 1 1 1
//        0 0 0 0 0

//        int n =5;
//        for(int i =0; i<n; i++){
//
//            for(int j =1; j<=n; j++){
//                System.out.print(i % 2 + " ");
//            }
//            System.out.println();
//        }

        // //23
//        1 1 1 1 1
//        0 0 0 0 0
//        1 1 1 1 1
//        0 0 0 0 0
//        1 1 1 1 1

//        int n =5;
//        for(int i =1; i<=n; i++){
//
//            for(int j =1; j<=n; j++){
//                System.out.print(i % 2 + " ");
//            }
//            System.out.println();
//        }

        // //24
//        0 1 0 1 0
//        0 1 0 1 0
//        0 1 0 1 0
//        0 1 0 1 0
//        0 1 0 1 0

//        int n = 5;
//        for(int i = 1; i<=n; i++){
//            for(int j = 0; j<n ; j++){
//                System.out.print(j%2 + " ");
//            }
//            System.out.println();
//        }



        // //25
//        1 0 1 0 1
//        1 0 1 0 1
//        1 0 1 0 1
//        1 0 1 0 1
//        1 0 1 0 1

//        int n = 5;
//        for(int i = 1; i<=n; i++){
//            for(int j = 1; j<=n ; j++){
//                System.out.print(j%2 + " ");
//            }
//            System.out.println();
//        }




        // //testing 
        // 1 2 3 4 5 6 7 8 9 10
        // 11 12 13 14 15 16 17 18 19 20
        // 21 22 23 24 25 26 27 28 29 30
        // int r=3;
        // int c=10;
        // int k=1;
        // for(int i=1; i<=r;i++){
        //     for(int j=1;j<=c;j++){
        //         System.out.print(k + " ");
        //         k++;
        //     }
        //     System.out.println();
        // }

    }
}
