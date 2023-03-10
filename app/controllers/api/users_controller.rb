class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save 
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  def index
    @users = User.all
    if @users
      render :index
    else
      render json: { errors: @users.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  def update
    @user = User.find_by(id: current_user.id)
    if @user.update!(user_params)
      render :show
    else
      render json: {errors: ['Update Failed']}
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end