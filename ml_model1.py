from sklearn.linear_model import LinearRegression
import numpy as np
import pandas as pd
df=pd.read_csv(r"study_time_vs_marks_dataset.csv")
x=df[["study_hours","sleep_hours"]]
y=df["exam_score"]
model=LinearRegression()
model.fit(x,y)  
user_input1=int(input("Enter study hours:" ))
user_input2=int(input("Enter sleep hours:" ))
input_df = pd.DataFrame([[user_input1, user_input2]], columns=["study_hours", "sleep_hours"])
predicted_score = model.predict(input_df)
print(f"Predicted exam score: {predicted_score[0]:.2f}")