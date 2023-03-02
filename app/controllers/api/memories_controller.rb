class Api::MemoriesController < ApplicationController

  def index
    @memories = Memory.all
    render :index
  end

  def show
    @memory = Memory.find_by(id: params[:id])
    render :show
  end

  def create
    @memory = Memory.new(memory_params)
    if @memory.save
      render :show
    else
      render json: @memory.errors.full_messages, status: 422
    end
  end

  def update
    @memory = Memory.find_by(id: params[:id])
    if @memory.update(memory_params)
      render :show
    else
      render json: @memory.errors.full_messages, status: 422
    end
  end

  def destroy
    @memory = Memory.find_by(id: params[:id])
    if @memory.destroy
      render :show
    else
      render json: @memory.errors.full_messages, status: 422
    end
  end

  private

  def memory_params
    memory.require(:memory).permit(:title, :body, :author_id)
  end

end
